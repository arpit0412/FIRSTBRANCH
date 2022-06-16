trigger leadTrigger on Lead (before insert) {
    system.debug('hey');

}