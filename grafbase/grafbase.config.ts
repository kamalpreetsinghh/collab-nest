import { g, auth, config } from "@grafbase/sdk";

// @ts-ignore
const User = g
  .model("User", {
    name: g.string().length({ min: 2, max: 20 }).search(),
    email: g.string().unique(),
    username: g.string().unique(),
    password: g.string().optional(),
    image: g.string().optional(),
    description: g.string().optional(),
    githubUrl: g.url().optional(),
    linkedInUrl: g.url().optional(),
    websiteUrl: g.url().optional(),
    forgotPasswordToken: g.string().optional(),
    forgotPasswordTokenExpiry: g.datetime().optional(),
    following: g
      .relation(() => User)
      .list()
      .optional(),
    followers: g
      .relation(() => User)
      .list()
      .optional(),
    projects: g
      .relation(() => Project)
      .list()
      .optional(),
  })
  .auth((rules) => {
    rules.public().read();
    rules.private().create().delete().update();
  });

// @ts-ignore
const Project = g
  .model("Project", {
    title: g.string().length({ min: 3 }),
    description: g.string(),
    image: g.url(),
    liveSiteUrl: g.url(),
    githubUrl: g.url(),
    category: g.string().search(),
    createdBy: g.relation(() => User),
  })
  .auth((rules) => {
    rules.public().read();
    rules.private().create().delete().update();
  });

const jwt = auth.JWT({
  issuer: "grafbase",
  secret: g.env("NEXTAUTH_SECRET"),
});

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private(),
  },
});
