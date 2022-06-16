trigger updateRecord on Contact(after insert, after update) {
    if(trigger.isafter || trigger.isinsert && trigger.isupdate){
    list<contact> conlist = [SELECT Id, Name, Phone, account.Id, account.Name, account.Phone from contact WHERE accountId!= null and id IN:trigger.new];
    list<account> acclist= new list<account>();
        for(contact con: conlist){
                account acc = new account();
                acc.id =con.accountid;
                acc.phone=con.phone;
                acclist.add(acc);
            }
    if(acclist.size()>0){
       
        update acclist;

           }

    }

}