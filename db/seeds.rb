# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

jared = User.create(name:'Jared Grippe', email:'jared@change.org', password:'password', password_confirmation:'password')


jared.petitions.create(
  target:'President Obama',
  ask: 'Please stop singing',
  description: 'Obama sucks at singing. Please help make him stop by signing this petition'
)

jared.petitions.create(
  target: 'Boy Scouts of America',
  ask: 'Reinstate Cub Scout leader who was removed for being gay',
  description: <<-DESCRIPTION
    My name is Jennifer Tyrrell. I am a devoted partner, mother, friend and community leader in Bridgeport,
    Ohio. I'm also a former Tiger Cub den leader with the Boy Scouts of America (BSA). I was recently removed
    from this volunteer position, and my membership was revoked after nearly a year of service - just because
    I happen to be gay.
  DESCRIPTION
)

jared.petitions.create(
  target: 'Village Voice Media',
  ask: 'Stop Child Sex Trafficking on Backpage.com',
  description: <<-DESCRIPTION
    Sex trafficking of girls and boys on Backpage.com, owned by Village Voice Media, is becoming a disturbing
    trend.

    A Georgia man was arrested for pimping two 17-year-old girls around the Nashville area. Detectives responded
    to a suspicious ad on Backpage.com and drove to a motel. There, they found the teens and their 37-year-old
    imp, as well as a laptop computer, likely used for the online advertising. Just four days prior to that,
    four people in Denver were arrested for forcing a teen girl into prostitution. They also advertised her sexual
    services, including semi-nude pictures, on Backpage. And last year, a South Dakota couple was arrested for
    selling underage girls for sex on .... wait for it ... Backpage.com yet again.
  DESCRIPTION
)

jared.petitions.create(
  target: 'Pontiac Academy for Excellence ',
  ask: 'Re-Hire Brooke Harris at Pontiac Academy for Excellence',
  description: <<-DESCRIPTION
    Brooke Harris was fired from the Pontiac Academy for Excellence in Michigan after helping her students
    organize a fundraiser for Trayvon Martin's family.

    She knew how important it is to give students opportunities to bring real-world experiences into the classroom.
    Her mainly African-American students wanted to know more about Trayvon Martin's death, and Ms. Harris seized
    the teachable moment.

    Stories like Brooke's are outrageous in their own right, but even worse, they create an atmosphere of fear
    that hobbles our best teachers.

    Sign the petition and tell administrators we will not tolerate the silencing of our nation's best teachers.
  DESCRIPTION
)
