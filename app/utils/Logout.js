import {AsyncStorage} from 'react-native';

export async function logout() {
  const value = await AsyncStorage.getItem('user');
  if(value !== null) {
    const status = await deleteUserMetaToken(JSON.parse(value).id, JSON.parse(value).authToken);
    if(status) {
      await AsyncStorage.removeItem('user');    
    }
  }  
}

async function deleteUserMetaToken(userID, authToken) {
  let formData = new FormData();
  formData.append('type', 'logout');
  formData.append('user_id', userID);
  formData.append('auth_token', authToken);
  
  return fetch('https://i-am-bulgarian.000webhostapp.com/authentication.php', {
    method: 'POST',
    body: formData
  })
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson.status;
  })
  .catch((error) => {
    console.error(error);
  });
}