class WarriorUnit extends EnemyUnit{
    constructor(level, number){
        super("warriorEnemy" + number,"Lv. " + level + " Warrior",new Decimal(1),new Decimal(1),level.mul(10));
    }
}