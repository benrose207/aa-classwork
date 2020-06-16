json.array! @parties do |party|
    json.name party.name
    json.location party.location
    
    json.guests do
        party.guests.each do |guest|
            json.set! guest.id do 
                json.name guest.name
            end
        end
    end
end