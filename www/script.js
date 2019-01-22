
$(document).ready(function(){

  $(".add__type").on('change',function(){
     
    if(this.value==='inc'){
      $('.expenses').hide(); 
      $('.incomee').show();
      
      $('.btnInc').css('display','block');
      $('.btnExp').css('display','none');
    }
    else{
      $('.expenses').show(); 
      $('.incomee').hide();
      
      $('.btnInc').css('display','none');
      $('.btnExp').css('display','block');
    }
    
  });
});
