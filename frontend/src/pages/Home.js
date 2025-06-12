import BannerProduct from '../components/BannerProduct';
import CategoryList from '../components/CategoryList';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct
        category={'tables'}
        heading={'L\'Art de Recevoir : Nos Tables'}
      />
      <VerticalCardProduct
        category={'bureaux'}
        heading={'Boostez Votre Productivité : Nos Bureaux'}
      />
      <HorizontalCardProduct
        category={'canapes'}
        heading={'Le Confort Redéfini : Nos Canapés'}
      />
      <VerticalCardProduct
        category={'extérieur'}
        heading={'Créez un Espace Extérieur Convivial'}
      />
      <VerticalCardProduct
        category={'meubles tv'}
        heading={'Organisez Votre Espace Média avec Style'}
      />
      <VerticalCardProduct
        category={'fauteuils'}
        heading={'Un Siège, Une Expérience : Nos Fauteuils'}
      />
      <HorizontalCardProduct
        category={'rangements'}
        heading={'Praticité et Élégance : Nos Meubles de Rangement'}
      />
      <HorizontalCardProduct
        category={'armoires'}
        heading={'Armoires Spacieuses pour Tous Vos Besoins'}
      />
      <VerticalCardProduct
        category={'décoration'}
        heading={'Laissez Parler Votre Style : Décoration'}
      />
      <VerticalCardProduct
        category={'lits'}
        heading={'Le Sommeil de Vos Rêves : Nos Lits'}
      />

      <HorizontalCardProduct
        category={'chaises'}
        heading={'L\'Élégance à Votre Table : Nos Chaises'}
      />
      <HorizontalCardProduct
        category={'meubles personnalisés'}
        heading={'Votre Vision, Notre Création : Meubles Personnalisés'}
      />
    </div>
  );
};

export default Home;
