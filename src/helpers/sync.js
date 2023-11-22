"use strict";

const User = require("../models/userModel");
const { BlogCategory, BlogPost } = require("../models/blogModel");

module.exports = async () => {
  await User.deleteMany().then(() => console.log(" - User Deleted All"));
  await BlogCategory.deleteMany().then(() =>
    console.log(" - BlogCategory Deleted All"),
  );
  await BlogPost.deleteMany().then(() =>
    console.log(" - BlogPost Deleted All"),
  );

  const user = await User.create({
    email: "test@test.com",
    password: "12345678",
    firstName: "Test",
    lastName: "Test",
  });

  const categories = [
    "World",
    "Technology",
    "Design",
    "Culture",
    "Business",
    "Politics",
    "Science",
    "Health",
    "Style",
    "Travel",
  ];
  const now = new Date();
  for (let category of categories) {
    const blogCategory = await BlogCategory.create({
      name: category,
    });
    // Example Posts:
    for (let key in [...Array(22)]) {
      await BlogPost.create({
        userId: user._id,
        blogCategoryId: blogCategory._id,
        title: `Sample ${category} Post -${key}`,
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, voluptate quaerat harum quos quis atque tenetur voluptatem quod exercitationem, neque aliquam libero temporibus sint odio ratione sed, officia dolorum ad.
        Sit ab sint quae facere nam autem modi exercitationem, accusantium alias in inventore optio, ratione impedit earum culpa eveniet perferendis unde. Nihil atque, tempore ullam at soluta rerum natus voluptatibus?
        Error, labore aliquid delectus incidunt odio nostrum. Perferendis fuga ut animi corporis, beatae quibusdam porro vel iure exercitationem provident id deleniti nostrum eos unde possimus, quas ipsam non error voluptas.
        Explicabo cumque quaerat ad, placeat rem autem consequatur, voluptatum sit iste sapiente dolore natus est, unde sunt! Aperiam at hic nisi nihil deserunt et. Exercitationem aperiam dicta facilis obcaecati recusandae?
        Aliquid quam doloribus alias suscipit, atque nostrum magnam neque accusantium soluta eum iure distinctio fugiat inventore nam velit non sit maxime nulla minus at! Excepturi voluptas quae aliquam perferendis accusantium!
        Explicabo qui fugit inventore omnis veniam adipisci dolorum atque unde, reiciendis saepe odio sit perspiciatis voluptates dolores quis similique neque ratione obcaecati! Vero ipsa, delectus beatae reprehenderit eum inventore recusandae.
        Natus, vero itaque fugiat architecto officiis nisi ducimus cupiditate et placeat voluptas excepturi? Odio pariatur blanditiis velit maiores aliquam rem illo suscipit vel atque architecto. Voluptas eaque totam asperiores perspiciatis?
        Mollitia, incidunt. Molestiae delectus, distinctio officiis et sequi iusto ducimus. Sequi mollitia consequatur facilis enim sapiente minus possimus neque laborum, iure, sint dolore accusantium esse in aliquid. Dolorem, deserunt sint.
        Eos temporibus aliquam repudiandae ducimus nam asperiores explicabo accusamus in, recusandae doloremque illum voluptates atque, dolor numquam omnis iusto, esse praesentium odio ad fuga mollitia voluptate? Quis odio quasi cum!
        Odit blanditiis ducimus corrupti ullam eos impedit maxime laudantium beatae quibusdam! Sapiente quasi dicta fugiat est cumque harum voluptatibus quo alias laudantium, dolore nobis numquam. Voluptate eveniet vero sequi asperiores.`,
        published: Boolean(key % 2),
        createdAt: now.getTime() + Math.random() * 10e8, // Random Time
      });
    }
  }
  console.log("* Synchronized *");
};
