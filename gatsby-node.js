exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    {
      allWork {
        nodes {
          excerpt
          description
          nombre
          titulo
          videos
          imagenes {
            alt
            src
          }
          portada {
            alt
            src
          }
        }
      }
    }
  `);
  data.allWork.nodes.forEach(work => {
    const slug = `/trabajos/${work.nombre}`;
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/components/job/job.tsx`),
      context: { work },
    });
  });
};
