'use strict';
{
  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [IN PROGRESS] add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');
  };

  /*czesc 2 zadanka*/

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  const generateTitleLinks = function () {

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {

      /* get the article id */

      const articleId = article.getAttribute('id');

      /* find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* get the title from the title element */

      /* create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* insert link into titleList */

      titleList.innerHTML = titleList.innerHTML + linkHTML;
    }
    const links = titleList.querySelectorAll('a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();


  /*czesc 3 zadanka*/

  const optArticleTagsSelector = '.post-tags .list';

  const generateTags = function () {

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */

    for (let article of articles) {

      /* find tags wrapper */

      const tagsWrapper = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */

      let html = '';

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');


      /* START LOOP: for each tag */

      for (let tag of articleTagsArray) {

        /* generate HTML of the link */

        const linkHTML = '<li><a href="#tag-' + articleTags + '"><span>' + articleTagsArray + '</span></a></li>';

        /* add generated code to html variable */

        article.innerHTML = article.innerHTML + linkHTML;
      }
      /* END LOOP: for each tag */

      /* insert HTML of all the links into the tags wrapper */

      const links = tagsWrapper.querySelectorAll('a');
      console.log (links)
      /* END LOOP: for every article: */
    }
  }

  generateTags();
}
