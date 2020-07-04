import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import SupermarketIcon from '@material-ui/icons/ShoppingCart';
import CinemaIcon from '@material-ui/icons/Movie';
import StartUpIcon from '@material-ui/icons/Business';


const businessIcon = (category) => {
  switch (category) {
    case 'STARTUP':
      return StartUpIcon;
    case 'RESIDENCE':
      return HomeIcon;
    case 'RESTAURANT':
      return RestaurantIcon;
    case 'ECOLE':
      return SchoolIcon;
    case 'SUPERMARCHE':
      return SupermarketIcon;
    case 'CINEMA':
      return CinemaIcon;
    default:
      return undefined;
  }
}

export default businessIcon;
