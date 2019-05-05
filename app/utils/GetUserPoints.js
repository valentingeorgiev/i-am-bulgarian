export async function fetchUserPoints(userID) {
  let formData = new FormData();
  formData.append('user_id', userID);
  try {
    const response = await fetch('https://i-am-bulgarian.000webhostapp.com/wp-content/plugins/i-am-bulgarian/includes/get-user-points.php', {
      method: 'POST',
      body: formData
    });
   
    const responseJson = await response.json();
    if(responseJson.status) {
      return responseJson.user_points
    }
  }
  catch (error) {
    console.error(error);
  }
}