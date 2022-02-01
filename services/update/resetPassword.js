

const resetPassword= async ()  => {
    fetch('https://ecomap.online/api/auth/reset-password/',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email
        })
      }).then(response => response.json())
        .then(data =>{
          setErrorMessageUserNotFound(data.error)
          setErrorMessageUserAuthenticated(data.description)
          Alert.alert(
            "Success!",
            "Alert Title",
            [
              {
                text: "Cancel",
                onPress: () => Alert.alert("Cancel Pressed"),
                style: "cancel",
              },
            ],
            
          );
          setTimeout(() =>{
            setDisplayConfirmPw(true)
          },6000)
            
        }).catch(err => {
          console.log("Error:",err)
        })
}