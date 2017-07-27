$( document ).ready(function() {
    function newGame(numberOfPlayers){
        var hand;

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

        for(var i=1;i<=hand;i++){
            $("#card"+i).show();
        }

        $("#leftCards").text(90);

        $("#pile1").text(100);
        $("#pile2").text(100);
        $("#pile3").text(1);
        $("#pile4").text(1);

        var selectedCard = 0;
        var lastSelected = '';
        var index = 97;
        var cardNumber = -1;

        var deck = new Array(98);
        var visited = new Array(98);
        var used = new Array(hand+1);

        for(var i=0;i<=hand;i++){
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
                if(used[cardNumber] == 0){
                    used[cardNumber] = 1;
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
                if(used[cardNumber] == 0){
                    used[cardNumber] = 1;
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
            var count=0;

            for(var i=1;i<=hand;i++){
                if(used[i]){
                    count++;
                }
            }

            if(count<2){
                return;
            }

            for(var i=1;i<=hand;i++){
                $("#card" + i).show();

                if(used[i]){
                    if(index == -1){
                        $("#card" + i).hide();
                    }
                    else{
                        $("#card" + i).text(deck[index]);
                        index--;
                    }
                }
                used[i] = 0;
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
            if(index+1 == 0){
                alert("Congratulations! You won the game!");
            }
        });

    }

    newGame(1);
    $("#new-game").click(function(){ 
        newGame(1);
    });    
});