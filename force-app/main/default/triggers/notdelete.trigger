trigger notdelete on masterji__c (before delete) {
  for(masterji__c mj : trigger.old)
  {
      mj.addError('you dont have permission to delete');
  }
}