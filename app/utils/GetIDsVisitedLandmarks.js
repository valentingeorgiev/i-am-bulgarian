export async function fetchIDsVisitedLandmarks(userID) {
  let formData = new FormData();
  formData.append('user_id', userID);
  try {
    const response = await fetch('https://i-am-bulgarian.000webhostapp.com/wp-content/plugins/i-am-bulgarian/includes/visited-landmark.php', {
      method: 'POST',
      body: formData
    });
   
    const responseJson = await response.json();
    if(responseJson.status) {
      return responseJson.visited_landmarks;
    }
  }
  catch (error) {
    console.error(error);
  }
}