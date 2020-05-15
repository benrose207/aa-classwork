# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Artwork.destroy_all
ArtworkShare.destroy_all

u1 = User.create!(username: 'Ben')
u2 = User.create!(username: 'Alex')
u3 = User.create!(username: 'Carlos')


artwork1 = Artwork.create!(title: 'Mona Lisa', image_url: 'www.monalisa.com', artist_id: u1.id)
artwork2 = Artwork.create!(title: 'Blade of Grass', image_url: 'www.bog.com', artist_id: u1.id)
artwork3 = Artwork.create!(title: 'Under the Table', image_url: 'www.utt.com', artist_id: u2.id)

ArtworkShare.create!(artwork_id: artwork1.id, viewer_id: u3.id)
ArtworkShare.create!(artwork_id: artwork1.id, viewer_id: u2.id)
ArtworkShare.create!(artwork_id: artwork3.id, viewer_id: u1.id)

c1 = Comment.create!(author_id: u1.id, artwork_id: artwork3.id, body: "Not your best work")
c2 = Comment.create!(author_id: u3.id, artwork_id: artwork1.id, body: "I think I met that girl on Hinge last week")
c3 = Comment.create!(author_id: u3.id, artwork_id: artwork2.id, body: "Much better than I could do")

Like.create!(liker_id: u3.id, likeable_id: c1.id, likeable_type: "Comment")
Like.create!(liker_id: u3.id, likeable_id: artwork2.id, likeable_type: "Artwork")
Like.create!(liker_id: u2.id, likeable_id: artwork2.id, likeable_type: "Artwork")
Like.create!(liker_id: u2.id, likeable_id: c1.id, likeable_type: "Comment")