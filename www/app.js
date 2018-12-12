


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
        btn:'.add__btn'


    };







    return {
        domString,

        getInput :function(){
            return{
            type : document.querySelector(domString.inputType).value,
            description : document.querySelector(domString.inputDescription).value,
            value : document.querySelector(domString.inputValue).value,
            

            }
            
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
        
        
        //3.add the item to the UI

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