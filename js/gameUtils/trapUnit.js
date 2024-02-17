class TrapUnit{
    constructor(id,name,damage,critChance,critMult,hitPoints){
        this.id = id;
        this.name = name;
        this.damage = damage
        this.critChance = critChance;
        this.critMult = critMult;
        this.hitPoints = hitPoints;
        this.usedUp = false;
    }

    use(hitPoints){
        if (this.usedUp) return new Decimal(0);
        this.hitPoints = this.hitPoints.sub(hitPoints);
        if (this.hitPoints.lte(0)) this.usedUp = true;
        let thisDamage = this.damage;
        if (this.critChance.gte(Math.random())) thisDamage = thisDamage.mul(this.critMult);
        return thisDamage;
    }
}