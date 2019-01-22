


var DTcontroler = (function(){

    var Expens=function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
        this.percentage=-1;
    };
    Expens.prototype.calculPercentage=function(totalinc){
        if(totalinc>0){
            this.percentage=Math.round((this.value/totalinc)*100);
        }else{
            this.percentage=-1;
        }
        
    };
    Expens.prototype.getPercentage=function(){
        return this.percentage;
    };

    var Incomes=function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
    };

    calculateTotals=function(type){
        var sum=0;
        data.allItems[type].forEach(function(current){
            sum+=current.value;
        });
        data.totals[type]=sum;
    };

    var data={
        allItems:{
            exp:[],
            inc:[]
        },
        totals:{
            exp:0,
            inc:0
        },
        percentage:-1,
        budg:0
    };
    
    return{
        addItem:function(type,des,val){
            var newItem,ID;

            if(data.allItems[type].length>0){
                ID=data.allItems[type][data.allItems[type].length-1].id+1;
            }else {
                ID=0;
            }

            if(type==='exp'){
                newItem=new Expens(ID,des,val);
            }else if(type==='inc'){
                newItem=new Incomes(ID,des,val);
            }

            data.allItems[type].push(newItem);
            //data.totals[type]+= newItem.value;
            
            
            return newItem;
            
        },
        ctrdeletItem:function(type,id){
            var ids,index;

            ids=data.allItems[type].map(function(current){

                return current.id;
            });

            index=ids.indexOf(id);
            if(index!==-1){
                data.allItems[type].splice(index,1);
            }
            

            
        },
        
        calcBudg:function(){
            
            //calculat total inc and exp
            calculateTotals('exp');
            calculateTotals('inc');
            //calculat the budg
            data.budg=data.totals.inc-data.totals.exp; 
            //calculate total exp percentage
            if(data.totals.inc>0){
                data.percentage=Math.round((data.totals.exp/data.totals.inc)*100); 
            }else{
                data.percentage=-1;
            }
            
            
           
        },
        //exp percentage
        calcPercentages:function(){
            data.allItems.exp.forEach(function(cur){
                cur.calculPercentage(data.totals.inc);
            });
        },
        getPercentages:function(){
            var allPerc=data.allItems.exp.map(function(cur){
                return cur.getPercentage();
            });
            return allPerc;
        },

        getbudg:function(){
            
            return {
                budge:data.budg,
                totInc:data.totals.inc,
                totExp:data.totals.exp,
                percentage:data.percentage
            }
        },
        
        store:function(){
            localStorage.clear();
            var incread=JSON.stringify(data.allItems.inc);
            localStorage.setItem('inc',incread);
            var expread=JSON.stringify(data.allItems.exp);
            localStorage.setItem('exp',expread);
            
        },
        getStore:function(add){
            var incStore ,expStore,incObj,expObj;
            if(localStorage.length>0){
                 incObj= JSON.parse(localStorage['inc']);
            for(var i=0;i<incObj.length;i++){
                 incStore=new Incomes(incObj[i].id,incObj[i].description,incObj[i].value);
                 data.allItems.inc.push(incStore);
                 add(incStore,'inc');
            }
            expObj= JSON.parse(localStorage['exp']);
            for(var i=0;i<expObj.length;i++){
                 expStore=new Expens(expObj[i].id,expObj[i].description,expObj[i].value,expObj[i].percentage);
                 data.allItems.exp.push(expStore);
                 add(expStore,'exp');
            }
        }
    
        },
        storeUI:function(){
            obj={
                type:'inc',
                obJ:data.allItems.inc
            }
        }
        
        
    }






})();


var UIcontroller = (function(){

    var domString={
        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue:'.add__value',
        btn:'.add__btn',
        expensItem:'.expenses__list',
        incomsItem:'.income__list',
        totalBudget:'.total',
        totalInc:".income-value",
        totalExp:".expens-value",
        percentage_exp:'.budget__expenses--percentage',
        container:'.container',
        expPercLabel:'.item__percentage',



    };







    return {
        domString,

        getInput :function(){
            return{
            type : document.querySelector(domString.inputType).value,
            description : document.querySelector(domString.inputDescription).value,
            value :parseFloat( document.querySelector(domString.inputValue).value),
            

            }
            
        },
        addIU :function(obj,type){
            var html,newHtml,element;
            if(type==='inc'){
                element=domString.incomsItem;
            html=' <div class="item clearfix" id="inc-%id%"><div class="item__description itemInc">%des%</div><div class="right clearfix"><div class="item__value itemInc">%val%</div><div class="item__delete"><button class="item__delete--btn"><img src="delete-b.png"></button></div></div></div>';
            }else if(type==='exp'){
                element=domString.expensItem;
            html='<div class="item clearfix" id="exp-%id%"><div class="item__description">%des%</div><div class="right clearfix"><div class="item__value">%val%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><img src="delete-b.png"></button></div></div></div>';
            
            }
            newHtml=html.replace('%id%',obj.id);
            newHtml=newHtml.replace('%des%',obj.description);
            newHtml=newHtml.replace('%val%',obj.value);

            document.querySelector(element).insertAdjacentHTML("beforeend",newHtml);

        },
        deletUI:function(id){
            var el=document.getElementById(id);
            el.parentNode.removeChild(el);
            
        },
        addTotal:function(bdg,inc,exp,prs){
            document.querySelector(domString.totalBudget).textContent=bdg;
            document.querySelector(domString.totalInc).textContent=inc;
            document.querySelector(domString.totalExp).textContent=exp;
            document.querySelector(domString.percentage_exp).textContent=prs+'%';
        },
        cleanInputs:function(){
           var inputs = document.querySelectorAll(domString.inputDescription+','+domString.inputValue);
           var arrayInputs=Array.prototype.slice.call(inputs);
           arrayInputs.forEach(function(current,index,array) {
              current.value=""; 
           });
           arrayInputs[0].focus();
        },
        displayPercentages:function(percentages){
            var fields=document.querySelectorAll(domString.expPercLabel);

            var nodeListForeach=function(list,calback){
                for(var i=0;i<list.length;i++){
                    calback(list[i],i);
                }
            };

            nodeListForeach(fields,function(cur,index){
                if(percentages[index]>0){
                    cur.textContent=percentages[index]+'%';
                }else{
                    cur.textContent='---';
                }
            });
        },

    };

})();


var controller = (function(DTCtrl,UICtrl){

    var setupEventListners =function(){
        var DOM=UICtrl.domString;
        
        DTCtrl.getStore(UICtrl.addIU);
        updateUI();
        updatePercentages();
        //DTCtrl.addIU(obj,type);
        document.querySelector(DOM.btn).addEventListener('click',addItem);
        
        //event of delete item
        document.querySelector(DOM.container).addEventListener('click',deletItem);
        

    };

    var updateUI=function(){
        //4.calculate the budget
        DTCtrl.calcBudg();
        //4-1.return budg
        var totalBdg=DTCtrl.getbudg();
        //5.display the budget on the UI
        UICtrl.addTotal(totalBdg.budge,totalBdg.totInc,totalBdg.totExp,totalBdg.percentage);
        
        
        
    };
    var updatePercentages = function(){
        //1calculate percentages
        DTCtrl.calcPercentages();
        //2 read percentages from the budget ctrl
        var allPrc=DTCtrl.getPercentages();
        //3 update the ui with new percentages
        UICtrl.displayPercentages(allPrc);
    };

    var addItem=function(){
        //1.get the field input data
        var input=UICtrl.getInput();

        if(input.description !=="" && !isNaN(input.value) && input.value>0){
        //2.add the item to the controller
        var item=DTCtrl.addItem(input.type,input.description,input.value);
        UICtrl.cleanInputs();
        
        //3.add the item to the UI
        UICtrl.addIU(item,input.type);
        
        //4.update ui
        updateUI();
        //
        updatePercentages();
        //store
        DTCtrl.store();
        
        }

        
        
        
        
        
    };

    var deletItem=function(event){
        var itemID,split,type,ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID){
            split=itemID.split('-');
            type=split[0];
            ID=parseInt(split[1]);
            //delete from data
            DTCtrl.ctrdeletItem(type,ID);
            //delet from UI
            UICtrl.deletUI(itemID);
            //update ui
            updateUI();
            
            updatePercentages();

            DTCtrl.store();


        }

        
        

    };
    
     
    return {
        init:function(){
            

            setupEventListners();
        }
    };





})(DTcontroler,UIcontroller);

controller.init();