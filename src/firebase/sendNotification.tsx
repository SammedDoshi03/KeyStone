export function sendNotifcation(token:string, title:string, body:string) {
    var key = 'AAAAKOgiIwA:APA91bFrguZ0NayJq5Pwj8s6pt8EPUGkFP0J6Sk5UupijH3TfDd635PhzUEKUsmzU7qZwaoXeu9h-55N-93D86mQb4l2HxLjJe8t-wmxFAHKymbOB46bZHC94CbosB8Fn0tTGNK1lIPP';
    fetch('https://fcm.googleapis.com/fcm/send', {
        'method': 'POST',
        'headers': {
          'Authorization': 'key=' + key,
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
          'notification': {
            title, 
            body
          },
          'to': token
        })
      })
      .then(res=>res.json())
      .then(function(response) {
        console.log(response);
      }).catch(function(error) {
        console.error(error);
      });
}