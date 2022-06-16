trigger BlockMoreThan2ContactOnAccount on Contact (after insert, after update, after undelete) {
  Set<Id> accountIds = new Set<Id>();
  for(Contact record: Trigger.new) {
    accountIds.add(record.AccountId);
  }
  accountIds.remove(null);
  Set<Id> morethan2Contacts = new Map<Id, AggregateResult>([
    SELECT AccountId Id
    FROM Contact
    WHERE AccountId = :accountIds
    GROUP BY AccountId
    HAVING COUNT(Id) > 2]).keySet();
  for(Contact record: Trigger.new) {
    if(moreThan2Contacts.contains(record.AccountId)) {
      record.AccountId.addError('You may not have more than 2 contacts per account.');
    }
  }
}