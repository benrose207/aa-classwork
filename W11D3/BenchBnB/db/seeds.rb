# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Bench.destroy_all
b1 = Bench.create(description: "CHICA", lat: 37.816655, lng: -122.257298)
b2 = Bench.create(description: "Taco's Oscar", lat: 37.828622, lng: -122.260248)
b3 = Bench.create(description: "Temescal Brewing", lat: 37.830360, lng: -122.264490)
b4 = Bench.create(description: "Drake's Dealership", lat: 37.812790, lng: -122.266786)
b5 = Bench.create(description: "Geta", lat: 37.826613, lng: -122.252931)