class Book < ActiveRecord::Base
end

class Child < ActiveRecord::Base
  self.has_many(:borrowedbooks)
end

class Borrowedbook < ActiveRecord::Base
  self.has_one(:book)
end



class User < ActiveRecord::Base
  self.has_one(:fav_character)
end

class Character < ActiveRecord::Base
  # self.has_many(:fav_characters) or is it belongs to?
end

class Comic < ActiveRecord::Base
  # 
end

class Badge < ActiveRecord::Base
end

# **<{{ Join tables }}>** -----------------------------

class Fav_character < ActiveRecord::Base
end

class Comic_appearance < ActiveRecord::Base
end

class Users_comic < ActiveRecord::Base
end

class Users_badge < ActiveRecord::Base
end