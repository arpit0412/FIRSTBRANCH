public class updatedAcc {
    public static void UpAc(){
        list<Account> acct = new list<Account>();
        
         
          for (Account acc:[ Select ID , Name, Phone from Account] ){
             if (acc.Phone == null){
                 acc.phone = '12345567788';
		   acct.add(acc);
                }
                
            }
      update acct;
        System.debug(acct);
       
    }
    
}