import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import Image from "next/image";
import user1 from "../assets/images/backgrounds/u2.jpg";
import user2 from "../assets/images/backgrounds/u3.jpg";
import user3 from "../assets/images/backgrounds/u4.jpg";
import transitions from "@material-ui/core/styles/transitions";
const Content = () => {
  const blogs = [
    {
      img: user1,
      title: "Awesome Products ✌",
      subtitle: `"I bought a tshirt and hoodies from here. The quality is remarkable. it's well worth the money for their high quality products, I highly recommend to buy their products!"`,
    },
    {
      img: user2,
      title: "Appreciation Reviews 👏",
      subtitle: `"I have Bought the product from here and quality of the product is great. I receved free shipping beacause it was my first purchase. It is worth the money for their high quality products, I highly recommend to buy their products!"`,
      // btncolor: "warning",
    },
    {
      img: user3,
      title: "Aesthetic Product 🤗",
      subtitle: `"I got a pair of Mugs from their website I’m very satisfied. They are high-quality and worth the money. The store also offered free shipping at that price so that’s a plus!"`,
      // btncolor: "primary",
    },
  ];
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-red-600 tracking-widest font-medium title-font mb-3">
              Wear the streetWear
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              High
              <span class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-400 relative inline-block m-2">
                <span class="relative text-white">street</span>
              </span>
              wear
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table. Franzen you probably
            </p>
          </div>
          <Grid container>
            {blogs.map((blog, index) => (
              <Grid
                key={index}
                item
                xs={12}
                lg={4}
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                }}
              >
                <Card
                  sx={{
                    p: 0,
                    width: "100%",
                    m: 4,
                    borderRadius: "25px",
                    hover: "opacity 0",
                  }}
                >
                  <Image src={blog.img} alt="img" />
                  <CardContent
                    sx={{
                      paddingLeft: "30px",
                      paddingRight: "30px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "h5.fontSize",
                        fontWeight: "500",
                      }}
                    >
                      {blog.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        mt: 1,
                      }}
                    >
                      {blog.subtitle}
                    </Typography>
                    {/* <Button
                variant="contained"
                sx={{
                  mt: "15px",
                }}
                color={blog.btncolor}
              >
                Learn More
              </Button> */}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </section>
    </div>
  );
};

export default Content;
