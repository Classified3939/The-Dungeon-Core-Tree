class WarriorEnemy extends EnemyUnit{
    constructor(level,health=new Decimal(-1)){
        if (new Decimal(health).equals(-1)){
            health = level.mul(10);
        }
        super("warriorEnemy","Lv." + new Decimal(level) + " Warrior",new Decimal(1),new Decimal(1),new Decimal(health));
    }

    attack(attackingObject){
        super.attack(attackingObject);
    }
}