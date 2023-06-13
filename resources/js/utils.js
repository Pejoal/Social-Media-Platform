import { ref, onMounted, onUnmounted } from "vue";

export const getRandomDigits = (length = 16) => {
  let randomNumber = "";
  for (let i = 0; i < length; i++) {
    randomNumber += Math.floor(Math.random() * 10);
  }
  return randomNumber;
};

export const useFetch = (url, page, initialData) => {
  const defaultPaginatedItemsLength = 15;
  if (initialData.length < defaultPaginatedItemsLength) {
    return { data: ref(initialData), loading: false };
  }

  onMounted(() => {
    window.addEventListener("scroll", () => fetch(url));
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", () => fetch(url));
  });

  const data = ref(initialData);
  // const page = ref(2); // first page data already got from props
  const lastPage = ref(false);
  const loading = ref(false);

  const fetch = async (url) => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    // when Reaching double Screnn heigth of windowBottom
    if (windowBottom + window.innerHeight * 2 >= docHeight) {
      if (lastPage.value || loading.value) {
        return;
      }

      try {
        loading.value = true;
        const response = await axios.get(url, {
          params: {
            page: page.value,
          },
        });

        data.value.push(...response.data.data);
        lastPage.value = !response.data.links.next;
        page.value++;
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    }
  };

  return { data, page, loading };
};
