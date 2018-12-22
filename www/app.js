


var DTcontroler = (function(){

    var Expens=function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
    };

    var Incomes=function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
    };

    var data={
        allItems:{
            exp:[],
            inc:[]
        },
        totals:{
            exp:0,
            inc:0
        }
        },
        percentage:0,
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
            data.totals[type]+= newItem.value;
            
            
            return newItem;
            
        },
        calcBudg:function(){
            var budge, totInc=0,totExp=0;
            totInc=data.totals.inc;
            totExp=data.totals.exp;
            
            budge=totInc-totExp;
            data.budg=budge;
            
           return {
               budge,
               totInc,
               totExp
           }
        },
        test:function(){
            return data;
        },
        calcPercentage:function(){
            var p=data.percentage=Math.round((data.totals.exp/data.totals.inc)*100);
            return p;
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
        percentage_exp:'.budget__expenses--percentage'


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
            html=' <div class="item clearfix" id="%id%"><div class="item__description">%des%</div><div class="right clearfix"><div class="item__value">%val%</div><div class="item__delete"><button class="item__delete--btn"><img src="delete-b.png"></button></div></div></div>';
            }else if(type==='exp'){
                element=domString.expensItem;
            html='<div class="item clearfix" id="%id%"><div class="item__description">%des%</div><div class="right clearfix"><div class="item__value">%val%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><img src="delete-b.png"></button></div></div></div>';
            
            }
            newHtml=html.replace('%id%',obj.id);
            newHtml=newHtml.replace('%des%',obj.description);
            newHtml=newHtml.replace('%val%',obj.value);

            document.querySelector(element).insertAdjacentHTML("beforeend",newHtml);

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
        }

    };

})();


var controller = (function(DTCtrl,UICtrl){

    var setupEventListners =function(){
        var DOM=UICtrl.domString;
        document.querySelector(DOM.btn).addEventListener('click',addItem);
        
    };

    var updateUI=function(){
        //4.calculate the budget
        var totalBdg=DTCtrl.calcBudg();
        //4-1.percentage
        var expPercentage=DTCtrl.calcPercentage();
        //5.display the budget on the UI
        UICtrl.addTotal(totalBdg.budge,totalBdg.totInc,totalBdg.totExp,expPercentage);
        
        
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

        
        }

        console.log('button was clicked');
        
        
        
        
    };
    
     
    return {
        init:function(){
            console.log('app has started');

            setupEventListners();
        }
    };





})(DTcontroler,UIcontroller);

controller.init();