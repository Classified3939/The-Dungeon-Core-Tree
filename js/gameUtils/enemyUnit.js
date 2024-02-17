class EnemyUnit{
    constructor(id,name,level,baseDamage,hitPoints){
        this.id = id;
        this.name = name;
        this.level = level;
        this.baseDamage = baseDamage;
        this.hitPoints = hitPoints;
        this.killed = false;
    }

    getDamageDone(attackedObject){
        return this.baseDamage.mul(this.level);
    }

    getDamageTaken(attackingObject){
        return attackingObject.use();
    }

    attack(attackedObject){
        this.hitPoints = this.hitPoints.sub(getDamageTaken(attackedObject));
        if (this.hitPoints.lte(0)) 
        {
            this.killed = true;
            return new Decimal(0);
        }
        return this.getDamageDone(attackedObject);
    }
}