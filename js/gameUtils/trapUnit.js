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

    getDamageDone(){
        let thisDamage = this.damage;
        if (this.critChance.gte(Math.random())) thisDamage = thisDamage.mul(this.critMult);
        return thisDamage;
    }

    use(hitPoints){
        if (this.usedUp) return
        this.hitPoints = this.hitPoints.sub(hitPoints);
        if (this.hitPoints.lte(0)) this.usedUp = true;
    }
}