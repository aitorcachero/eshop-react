import { useState, useEffect } from 'react';
import './SearchForm.css';
import useProducts from '../../hooks/useProducts';
import { debounce } from 'debounce';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '50%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchForm({ categorys, max, set }) {
  const [maxPrice, setMaxPrice] = useState(max);
  const [value, setValue] = useState(maxPrice);
  const [category, setCategory] = useState(null);
  const [typeFilter, setTypeFilter] = useState(false); // mintomax || maxtomin
  const [search, setSearch] = useState('');
  const { filteredProducts, checkMaxPrice } = useProducts();

  useEffect(() => {
    const getFilteredProducts = () => {
      const fProducts = filteredProducts(category, value, typeFilter, search);
      set(fProducts);
    };

    getFilteredProducts();
  }, [value, category, typeFilter, search]);

  const handleChangeOrder = (e) => {
    setTypeFilter(e.target.value === 'mintomax' ? true : false);
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
    const checkMaxPriceFilter = checkMaxPrice(e.target.value);
    setMaxPrice(checkMaxPriceFilter);
    setValue(checkMaxPriceFilter);
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    const fProducts = filteredProducts(category, value, typeFilter, search);
    set(fProducts);
  };

  return (
    <>
      <div className="search-container">
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Buscar..."
            inputProps={{ 'aria-label': 'search' }}
            onChange={debounce(handleChangeSearch, 300)}
          />
        </Search>
      </div>
      <form className="form-filter">
        <div className="section-range">
          <label className="label" htmlFor="range">
            Precio
          </label>
          <input
            type="range"
            id="range"
            className="range"
            min={0}
            max={maxPrice}
            value={value}
            onChange={(e) => {
              debounce(setValue(e.target.value), 300);
            }}
          />
          <span className="range-value">{value} €</span>
        </div>
        <select className="select" onChange={handleChangeCategory}>
          <option value="">TODAS</option>
          {categorys.map((category) => {
            return (
              <option key={category} value={category}>
                {category.toUpperCase()}
              </option>
            );
          })}
        </select>
        <select className="select-orderby" onChange={handleChangeOrder}>
          <option value="mintomax">Precio: de menor precio a mayor</option>
          <option value="maxtomin">Precio: de mayor precio a menor</option>
        </select>
      </form>
    </>
  );
}
