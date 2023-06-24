import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const usersCount = await prisma.user.count();
  const postsCount = await prisma.post.count();
  const favoritesCount = await prisma.favorite.count();

  if (usersCount > 0 || postsCount > 0 || favoritesCount > 0) {
    console.log("Já existem registros no banco de dados. O seed não será executado.");
    return;
  }

  const user1 = await prisma.user.create({
    data: {
      name: "Margarida",
      email: "usuario1@example.com",
      password: "senha1",
      picture: "https://images.tcdn.com.br/img/img_prod/799330/margarida_gigante_branca_1261_1_20200525110702.jpg",
      posts: {
        create: [
          {
            title: "É Assim Que Acaba",
            author: "Colleen Hoover",
            coverUrl: "https://m.media-amazon.com/images/I/91r5G8RxqfL._AC_UF1000,1000_QL80_.jpg",
            summary: "Resumo de é assim que acaba da colleen hoover, autora controversa com um livro também muito discutido por se tratar de violência doméstica. A autora é acusada de ser leniente e romantizar o assédio e abuso sofridos no livro pela personagem principal, além do fato de o livro ser tido como um sucesso YA, o que o torna perigoso já que influencia negativamente as jovens...",
          },
          {
            title: "Verity",
            author: "Colleen Hoover",
            coverUrl: "https://m.media-amazon.com/images/I/91SDZ2eUj+L._AC_UF1000,1000_QL80_.jpg",
            summary: "A obra conta a história ficcional de Lowen Ashleigh, uma escritora prestes a declarar falência que é chamada para uma reunião misteriosa com um possível cliente para um livro. A história de Verity é narrada em primeira pessoa, justamente por Lowen, assim, temos apenas o seu ponto de vista durante toda a obra (e não a visão de um narrador imparcial)...",
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Tulipa",
      email: "usuario2@example.com",
      password: "senha2",
      picture: "https://www.infoescola.com/wp-content/uploads/2010/05/tulipa_645862144.jpg",
      posts: {
        create: [
          {
            title: "O Iluminado",
            author: "Stephen King",
            coverUrl: "https://m.media-amazon.com/images/I/41Yhjbn+F4L.jpg",
            summary: "Livro sobre uma familia que acaba ficando presa em um hotel durante uma nevasca, isolados do mundo pois estavam somente os três lá, acompanhando o pai, Jack, contratado como zelador. O menino Danny tem poderes e consegue ver, ouvir, e se comunicar com outras pessoas, vivas ou mortas, a longas distâncias. O hotel Overlook tem seus mistérios e fantasmas, que, conforme o tempo passa, começam a atormentar Jack, já com tendencia a beber e a neurose. Os três são constantemente visitados por fantasmas e visões, e no fim, Jack enlouquece com a solidão do local e tenta matar sua mulher e filho, que acabam se salvando explodindo a caldeira do hotel, enterrando os fantasmas e o pai.",
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  });

  console.log("Registros criados:", { user1, user2 });
}

main()
  .catch((e) => {
    console.error("Ocorreu um erro durante a execução do seed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });