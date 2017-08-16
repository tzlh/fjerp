function DemoObject(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.setAge = function(age) {
      alert(this.age + age);
    }
    this.getName = function() {
        return this.name;
    }
    this.getJob = function(sig) {
        return "[" + sig + "]" + this.job;
    }
}
