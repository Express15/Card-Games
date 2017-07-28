/*globals requster*/

class Data {
    saveScore(score) {
        const options = {
            data: {
                score
            }
        };
      //  console.log(document.location.href);
        const urlArray = document.location.href.split('/');
        const gameId = urlArray[urlArray.length - 3];
        const instanceId=urlArray[urlArray.length - 1];

        return requester.put('/games/' + gameId+'/play/'+instanceId, options);
    }
}

const data = new Data();

