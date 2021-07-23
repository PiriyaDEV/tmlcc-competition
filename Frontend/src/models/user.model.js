export default class User {
  constructor(user) {
    this.username = user.username;
    this.password = user.password;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.phone = user.phone;
    this.address = user.address;
    this.organization = user.organization;
    this.institute = user.institute;
    this.education = user.education;
    this.offer_trainee = user.offer_trainee;
    this.works = user.works;
  }
}
