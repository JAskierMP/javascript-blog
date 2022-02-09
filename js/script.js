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

  //czesc 2 zadanka...................................................................................................................

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optCloudClassCount = '5',
    optCloudClassPrefix = 'tag-size-';

  const optTagsListSelector = '.tags.list';

  const generateTitleLinks = function (customSelector = '') {

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = ('');

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    for (let article of articles) {

      /* get the article id */

      const articleId = article.getAttribute('id');

      /* find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* insert link into titleList */

      titleList.innerHTML = titleList.innerHTML + linkHTML;
    }
    const links = titleList.querySelectorAll('a');
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  //czesc 3 zadanka.......................................................................................................

  const optArticleTagsSelector = '.post-tags .list';

  const calculateTagsParams = function (tags) {

    const params = { max: 0, min: 999999 };
    for (let tag in tags) {
      console.log(tag + ' is used ' + tags[tag] + ' times');
      params.max = tags[tag] > params.max ? tags[tag] : params.max;
      params.min = tags[tag] < params.min ? tags[tag] : params.min;
    }
    return params;
  };

  const calculateTagClass = function (count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const classNumber = Math.floor(normalizedCount / normalizedMax * (optCloudClassCount - 1) + 1);
    return optCloudClassPrefix + classNumber;

  };

  const generateTags = function () {

    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */

    for (let article of articles) {

      /* find tags wrapper */

      const tagsWrapper = article.querySelector(optArticleTagsSelector);

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */

      for (let tag of articleTagsArray) {

        /* generate HTML of the link */

        const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

        /* add generated code to html variable */

        tagsWrapper.innerHTML = tagsWrapper.innerHTML + linkHTML;

        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {

          /* [NEW] add tag to allTags object */

          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }
      /* END LOOP: for each tag */

      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams)
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      const tagLinkHTML = '<li class="' + calculateTagClass(allTags[tag], tagsParams) + '"><a href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')</a></li>';
      console.log('tagLinkHTML:', tagLinkHTML);

      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsHTML += tagLinkHTML;

    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;

  };

  //część 4 zadanka........................................................................................................

  const tagClickHandler = function (event) {
    /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */

    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */

    for (let activeTagLink of activeTagLinks) {

      /* remove class active */

      activeTagLink.classList.remove('active');

      /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */

    const sameTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let sameTagLink of sameTagLinks) {

      /* add class active */
      sameTagLink.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  const addClickListenersToTags = function () {
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

    /* START LOOP: for each link */
    for (let tagLink of tagLinks) {
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */
    }

  };

  //Zadanie: dodanie autora

  const optArticleSelectors = '.post';
  const optArticleAuthorSelector = '.post-author';

  const generateAuthors = function () {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelectors);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find authors wrapper */
      const authorsWrapper = article.querySelector(optArticleAuthorSelector);

      /* get author from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');

      const linkHTML = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';

      /* insert HTML of all the links into the authors wrapper */

      authorsWrapper.innerHTML = linkHTML;

      /* END LOOP: for every article: */
    }
  };

  generateAuthors();

  const authorClickHandler = function (event) {
    /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    /* make a new constant "author" and extract author from the "href" constant */

    const author = href.replace('#author-', '');

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');

  };

  const addClickListenersToAuthors = function () {
    /* find all links to authors*/
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');

    /* START LOOP: for each link */
    for (let authorLink of authorLinks) {
      /* add authorClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);

      /* END LOOP: for each link */

    }
  };

  generateTitleLinks();
  generateTags();
  addClickListenersToTags();
  addClickListenersToAuthors();

}