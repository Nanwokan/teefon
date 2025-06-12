const About = () => {
  return (
    <div className="container mx-auto p-8 space-y-16">
      {/* Présentation */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">À propos de nous</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Teefon a été fondée pour répondre à une demande croissante de meubles
          uniques, écologiques et personnalisables en Côte d&apos;Ivoire. Nous
          croyons que chaque espace de vie mérite des meubles qui reflètent la
          personnalité et les besoins de ceux qui l&apos;habitent.
        </p>
        <a
          href="#mission"
          className="text-blue-600 font-semibold mt-2 inline-block"
        >
          Voir plus
        </a>
      </section>

      {/* Mission et vision */}
      <section id="mission" className="text-center">
        <h2 className="text-3xl font-semibold mb-6">Mission et vision</h2>
        <p className="text-gray-700 mb-4 max-w-2xl mx-auto">
          Notre mission est de proposer des meubles de qualité, fabriqués à
          partir de matériaux durables et écologiques, tout en offrant une
          expérience d&apos;achat simple et personnalisée.
        </p>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Notre vision est de devenir le leader en Côte d&apos;Ivoire dans le domaine
          des meubles sur mesure, respectueux de l&apos;environnement, et adaptés aux
          besoins de chacun.
        </p>
      </section>

      {/* Nos valeurs */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-8">Nos valeurs</h2>
        <div className="flex flex-wrap justify-center gap-12">
          <div className="flex flex-col items-center">
            <img
              src="/path/to/innovation.png"
              alt="Innovation"
              className="w-24 h-24 mb-2"
            />
            <span className="font-medium">Innovation</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/path/to/durabilite.png"
              alt="Durabilité"
              className="w-24 h-24 mb-2"
            />
            <span className="font-medium">Durabilité</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/path/to/satisfaction.png"
              alt="Satisfaction client"
              className="w-24 h-24 mb-2"
            />
            <span className="font-medium">Satisfaction client</span>
          </div>
        </div>
      </section>

      {/* Produits et services */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-6">Produits et services</h2>
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto">
          <div className="text-gray-700 md:w-1/2">
            <p>
              Teefon propose une large gamme de meubles en bois, fer, aluminium
              et plastique, adaptés à tous les goûts et tous les budgets.
            </p>
            <p className="mt-4">
              En plus de nos collections prêtes à l&apos;emploi, nous offrons un
              service de personnalisation unique pour des meubles sur mesure
              parfaitement adaptés à votre espace et votre style.
            </p>
          </div>
          <div className="md:w-1/2 h-48 bg-gray-200 rounded-lg"></div>{' '}
          {/* Placeholder image */}
        </div>
      </section>

      {/* Notre équipe */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-6">Notre équipe</h2>
        <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
          Notre équipe est composée de designers talentueux, d&apos;artisans
          passionnés et de professionnels du service client, tous dédiés à
          offrir le meilleur produit et la meilleure expérience à nos clients.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          {['ADAM', 'ADAM', 'ADAM', 'ADAM'].map((name, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mb-2"></div>
              <span className="font-medium">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pourquoi choisir Teefon */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-6">
          Pourquoi choisir Teefon ?
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          En choisissant Teefon, vous optez pour la qualité, la
          personnalisation, et un service exceptionnel. Nous offrons une
          garantie satisfaction et une livraison rapide partout en Côte
          d&apos;Ivoire.
        </p>
        <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
          Nous faisons plus que vendre des meubles. Nous créons des pièces qui
          racontent une histoire – votre histoire.
        </p>
      </section>
    </div>
  );
};

export default About;
