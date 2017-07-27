$( document ).ready(function() {
    function newGame(numberOfPlayers){
        var hand;

        //Find how many cards in a hand there are.
        switch(numberOfPlayers){
            case 1: hand = 8; break;
            case 2: hand = 7;
                    $("#card8").hide();
                     break;
            case 3: hand = 7; 
                    $("#card8").hide();
                     break;
            default: hand = 6; $("#card8").hide(); $("#card7").hide();
        }

        //Show the needed cards
        for(var i=1;i<=hand;i++){
            $("#card"+i).show();
        }

        //show how many are left in the deck
        $("#leftCards").text(90);

        //show the piles
        $("#pile1").text(100);
        $("#pile2").text(100);
        $("#pile3").text(1);
        $("#pile4").text(1);

        var selectedCard = 0; // the number written on the selected card. Example: 42
        var lastSelected = ''; // id of the card that is last selected. Example: '#card3'
        var index = 97; // the index of the top deck card. Example: 52
        var cardNumber = -1; //index of id of the card that is last selected. Example: 3

        var deck = new Array(98);
        var visited = new Array(98);
        var used = new Array(hand); // used cards during a turn

        //initialize the arrays
        for(var i=0;i<hand;i++){
            used[i] = 0;
        }

        for(var i=0;i<98;i++){
            visited[i] = 0;
        }

        for(var i=0;i<98;i++){
            var number = Math.floor((Math.random() * 98) + 2);

            while(visited[number]){
                number = Math.floor((Math.random() * 98) + 2);
            }
            
            deck[i]=number;
            visited[number]=1;
        }

        var sortedHand = new Array(hand);

        for(var i=0; i<hand;i++)
        {
            sortedHand[i] = Number(deck[index-i]);
        }

        sortedHand.sort(function(a, b){return a-b});

        for(var i=1; i<=hand;i++)
        {
            $("#card" + i).text(sortedHand[i-1]);
            index--;
        }

        function selectCard(id){
            selectedCard = $(id).text();
            lastSelected = id;
            cardNumber = Number(id.substring(5, 6));
        }

        $("#card1").click(function(){
            selectCard("#card1");
        });
        $("#card2").click(function(){
            selectCard("#card2");
        });
        $("#card3").click(function(){
            selectCard("#card3");
        });
        $("#card4").click(function(){
            selectCard("#card4");
        });
        $("#card5").click(function(){
            selectCard("#card5");
        });
        $("#card6").click(function(){
            selectCard("#card6");
        });
        $("#card7").click(function(){
            selectCard("#card7");
        });
        $("#card8").click(function(){
            selectCard("#card8");
        });

        function selectPile100(id){
            if(selectedCard == 0){
                return;
            }
            if(selectedCard < Number($(id).text()) || selectedCard == Number($(id).text()) + 10){
                if(used[cardNumber - 1] == 0){
                    used[cardNumber - 1] = 1;
                    $(id).text(selectedCard);
                    $(lastSelected).hide();
                }
            }
        }

        $("#pile1").click(function(){
            selectPile100("#pile1");
        });

        $("#pile2").click(function(){
            selectPile100("#pile2");
        });

        function selectPile1(id){
            if(selectedCard == 0){
                return;
            }
            if(selectedCard > Number($(id).text()) || selectedCard == Number($(id).text()) - 10){
                if(used[cardNumber - 1] == 0){
                    used[cardNumber - 1] = 1;
                    $(id).text(selectedCard);
                    $(lastSelected).hide();
                }
            }
        }

        $("#pile3").click(function(){
            selectPile1("#pile3");
        });

        $("#pile4").click(function(){
            selectPile1("#pile4");
        });

        $("#end-turn").click(function(){
            var count = 0;

            for(var i=0;i<hand;i++){
                if(used[i]){
                    count++;
                }
            }

            var canMove = 0;
            var cardIndex;

            for(var i=0;i<hand;i++){
                cardIndex = i + 1;
                if(!used[i]){
                    for(var j=1;j<=2;j++){
                        if(Number($("#card"+cardIndex).text()) < Number($("#pile"+j).text()) || Number($("#card"+cardIndex).text()) == Number($("#pile"+j).text()) + 10){
                            canMove=1;
                            break;
                        }
                    }
                    for(var j=3;j<=4;j++){
                        if(Number($("#card"+cardIndex).text()) < Number($("#pile"+j).text()) || Number($("#card"+cardIndex).text()) == Number($("#pile"+j).text()) + 10){
                            canMove=1;
                            break;
                        }
                    }
                }
            }

            if(canMove && count<2){
                return;
            }

            //Game Over
            if(!canMove && count<2){
                var numberOfCards = index+1;
                numberOfCards += 8 - count;
                var score = 0;
                if(numberOfCards<10){
                    score = 10 - numberOfCards;
                    alert("Congratulations! You won the game! Your score is:" + score);
                }
                else{
                    alert("Sorry, you lost the game...");
                }
                return;
            }

            for(var i=1;i<=hand;i++){
                $("#card" + i).show();

                if(used[i-1]){
                    if(index == -1){
                        $("#card" + i).hide();
                    }
                    else{
                        $("#card" + i).text(deck[index]);
                        index--;
                    }
                }
                used[i-1] = 0;
            }

            for(var i=1; i<=hand;i++)
            {
                sortedHand[i-1] = Number($("#card" + i).text());
            }

            sortedHand.sort(function(a, b){return a-b});

            for(var i=1; i<=hand;i++)
            {
                $("#card" + i).text(sortedHand[i-1]);
            }

            $("#leftCards").text(index+1);
        });

    }

    newGame(1);
    $("#new-game").click(function(){ 
        newGame(1);
    });    
});