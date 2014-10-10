require 'active_record'


class User < ActiveRecord::Base
  has_one(:fav_character)
  has_many(:users_comics)
  has_many(:users_badges)
end

class Character < ActiveRecord::Base
  has_many(:comic_chars)
  has_many(:fav_characters)
end

class Comic < ActiveRecord::Base
  has_many(:characters_comics)
  has_many :users_comics
end

class Badge < ActiveRecord::Base
  has_many :users_badges 
end

# **<{{ Join tables }}>** -----------------------------

class Fav_character < ActiveRecord::Base
  belongs_to :user
  belongs_to :character
end

class Comic_appearance < ActiveRecord::Base
  belongs_to :comic
  belongs_to :character
end

class Users_comic < ActiveRecord::Base
  belongs_to :user
  belongs_to :comic
end

class Users_badge < ActiveRecord::Base
  belongs_to :user
  belongs_to :comic
end


