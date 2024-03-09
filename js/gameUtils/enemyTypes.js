class WarriorEnemy extends EnemyUnit{
    constructor(level,health=new Decimal(-1)){
        if (new Decimal(health).equals(-1)){
            health = level.mul(10);
        }
        super("warriorEnemy","Lv." + new Decimal(level) + " Warrior",new Decimal(level),new Decimal(1),new Decimal(health));
    }

    attack(attackingObject){
        super.attack(attackingObject);
    }
}

class MageEnemy extends EnemyUnit{
    constructor(level,health=new Decimal(-1)){
        if (new Decimal(health).equals(-1)){
            health = level.mul(8);
        }
        super("mageEnemy","Lv." + new Decimal(level) + " Mage",new Decimal(level),new Decimal(3),new Decimal(health));
    }

    attack(attackingObject){
        super.attack(attackingObject);
    }
}

class ScoutEnemy extends EnemyUnit{
    constructor(level,health=new Decimal(-1)){
        if (new Decimal(health).equals(-1)){
            health = level.mul(12);
        }
        super("scoutEnemy","Lv." + new Decimal(level) + " Scout",new Decimal(level),new Decimal(1),new Decimal(health));
    }

    getDamageTaken(attackingObject){
        if (attackingObject.id === "spikeTrap" || attackingObject.id === "camoSpikeTrap"){
            return new Decimal(0);
        }
        else return attackingObject.getDamageDone();
    }

    getDamageDone(attackedObject){
        if (attackedObject.id === "spikeTrap" || attackedObject.id === "camoSpikeTrap"){
            return new Decimal(0);
        }
        return this.baseDamage;
    }

    attack(attackingObject){
        super.attack(attackingObject);
    }
}

const enemyTypes = ["warriorEnemy","mageEnemy","scoutEnemy"];