"use strict";

const { BlogCategory, BlogPost } = require("../models/Blog.model");
const User = require("../models/User.model");

module.exports = async () => {
  await User.deleteMany().then(() => console.log(" - User Deleted All"));
  await BlogCategory.deleteMany().then(() =>
    console.log(" - BlogCategory Deleted All"),
  );
  await BlogPost.deleteMany().then(() =>
    console.log(" - BlogPost Deleted All"),
  );

  const user = await User.create([
    {
      username: "test",
      email: "test@test.com",
      password: "aA*123456",
      firstname: "Test",
      lastname: "Test",
      isAdmin: true,
      isActive: true,
    },
    {
      username: " test1",
      email: "test1@test1.com",
      password: "aA*123456",
      firstname: "Test1",
      lastname: "Test1",
      isAdmin: false,
      isActive: true,
    },
    {
      username: "test2",
      email: "test2@test2.com",
      password: "aA*123456",
      firstname: "Test2",
      lastname: "Test2",
      isAdmin: false,
      isActive: true,
    },
    {
      username: "test3",
      email: "test3@test3.com",
      password: "aA*123456",
      firstname: "Test3",
      lastname: "Test3",
      isAdmin: false,
      isActive: true,
    },
    {
      username: "test4",
      email: "test4@test4.com",
      password: "aA*123456",
      firstname: "Test4",
      lastname: "Test4",
      isAdmin: false,
      isActive: true,
    },
  ]);

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
  const images = [
    "https://cdn.pixabay.com/photo/2015/05/31/10/55/man-791049_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/09/17/18/48/computer-4484282_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/10/02/15/00/diary-968592_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/04/05/01/16/food-2203732_1280.jpg",
    "https://cdn.pixabay.com/photo/2013/11/14/20/18/typewriter-210640_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/02/01/21/16/chalkboard-620316_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/10/09/14/00/vegetable-juices-1725835_1280.jpg",
    "https://geekflare.com/wp-content/uploads/2016/04/featured-image-generator.jpg",
  ];
  const now = new Date();
  for (let category of categories) {
    const blogCategory = await BlogCategory.create({
      name: category,
    });
    for (let key in [...Array(22)]) {
      let newKey = key % 4;
      let imageKey = key % 7;
      await BlogPost.create({
        userId: user.at(newKey)._id,
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
        createdAt: now.getTime() + Math.random() * 10e8,
        imageUrl: images.at(imageKey),
      });
    }
  }
  console.log("* Synchronized *");
};
