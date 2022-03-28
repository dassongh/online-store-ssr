export default function setWishListIndicator() {
  const indicatorRef = document.querySelector('.wishList-indicator');
  const indicatorNumber = document.querySelector('[data-wishListIndicator]');
  const listRef = document.getElementById('wishListContainer');

  if (listRef.childElementCount > 0) {
    indicatorRef.classList.remove('wishList-indicator--hidden');
    indicatorNumber.innerText = listRef.childElementCount;
  } else {
    indicatorRef.classList.add('wishList-indicator--hidden');
  }
}
