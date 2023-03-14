
export default {
  async contactCoach(context, payload) { // to make object sent by dispatch same strucure as requests []
    // id: new Date().toISOString(),
    // coachId: payload.coachId,
    const newRequest = {
      userEmail: payload.email,
      message: payload.message
    };
    const response = await fetch(`https://coach-app-4fbc5-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
      method: 'POST',// to create new entry to each request
      body: JSON.stringify(newRequest)
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to send request.');
      throw error;
    }

    newRequest.id = responseData.name;
    // firebase automatic generate unique id for every entry (new request)
    // will be add to Newrequest object
    // name >> available automatic in firebase
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },


  async fetchRequests(context) {
   // to show request to active coach id only
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(`https://coach-app-4fbc5-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=`
    +token );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch requests.');
      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      };
      requests.push(request);
    }

    context.commit('setRequests', requests);
  }
};