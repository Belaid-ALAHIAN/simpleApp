


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
            return newItem;
            
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


    };







    return {
        domString,

        getInput :function(){
            return{
            type : document.querySelector(domString.inputType).value,
            description : document.querySelector(domString.inputDescription).value,
            value : document.querySelector(domString.inputValue).value,
            

            },
        addIU :function(obj,type){
            var html,newHtml,element;
            if(type==='inc'){
                element=domString.incomsItem;
            html=' <div class="item clearfix" id="%id%"><div class="item__description">%des%</div><div class="right clearfix"><div class="item__value">%val%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if(type==='exp'){
                element=domString.expensItem;
            html='<div class="item clearfix" id="%id%"><div class="item__description">%des%</div><div class="right clearfix"><div class="item__value">%val%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            
            }
            newHtml=html.replace('%id%',obj.id);
            newHtml=newHtml.replace('%des%',obj.description);
            newHtml=newHtml.replace('%val%',obj.value);

            document.querySelector(element).insertAdjacentHTML("beforeend",newHtml);

        },
            //clear fields
       cleanInputs :function(){
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

    

    var addItem=function(){
        //1.get the field input data
        var input=UICtrl.getInput();
        //2.add the item to the controller
        var item=DTCtrl.addItem(input.type,input.description,input.value);
        UICtrl.cleanInputs();
        
        //3.add the item to the UI
        UICtrl.addIU(item,input.type);
        //4.calculate the budget
        
        //5.display the budget on the UI

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
