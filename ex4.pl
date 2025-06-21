:- module('ex4',
        [author/2,
         genre/2,
         book/4
        ]).

/*
 * **********************************************
 * Printing result depth
 *
 * You can enlarge it, if needed.
 * **********************************************
 */
maximum_printing_depth(100).
:- current_prolog_flag(toplevel_print_options, A),
   (select(max_depth(_), A, B), ! ; A = B),
   maximum_printing_depth(MPD),
   set_prolog_flag(toplevel_print_options, [max_depth(MPD)|B]).



author(a, asimov).
author(h, herbert).
author(m, morris).
author(t, tolkien).

genre(s, science).
genre(l, literature).
genre(sf, science_fiction).
genre(f, fantasy).

book(inside_the_atom, a, s, s(s(s(s(s(zero)))))).
book(asimov_guide_to_shakespeare, a, l, s(s(s(s(zero))))).
book(i_robot, a, sf, s(s(s(zero)))).
book(dune, h, sf, s(s(s(s(s(zero)))))).
book(the_well_at_the_worlds_end, m, f, s(s(s(s(zero))))).
book(the_hobbit, t, f, s(s(s(zero)))).
book(the_lord_of_the_rings, t, f, s(s(s(s(s(s(zero))))))).

% You can add more facts.

max_list([], false).
max_list([X], X).
max_list([H|T], Max) :-
    max_list(T, MaxTail),
    max_num(H, MaxTail, Max).

max_num(false, B, B).
max_num(A, false, A).
max_num(A, B, A) :- greater_than(A, B), !.
max_num(A, B, B).

greater_than(s(_), zero).
greater_than(s(A), s(B)) :- greater_than(A, B).


% Signature: author_of_genre(GenreName, AuthorName)/2
% Purpose: true if an author by the name AuthorName has written a book belonging to the genre named GenreName.
author_of_genre(GenreName, AuthorName) :-
    genre(GenreTerm, GenreName),
    author(AuthorTerm, AuthorName),
    findall(BookName, book(BookName, AuthorTerm, GenreTerm, _), BookList),
    BookList \= [].


% Signature: longest_book(AuthorName, BookName)/2
% Purpose: true if the longest book that an author by the name AuthorName has written is titled BookName.

longest_book(AuthorName, BookName) :-
    author(AuthorTerm, AuthorName),
    findall((Length, Title), book(Title, AuthorTerm, _, Length), List),
    max_book(List, (MaxLength, BookName)),
    MaxLength \= false.

max_book([], (false, false)).
max_book([(Length, Title)], (Length, Title)).
max_book([(L1, T1) | Rest], (MaxLength, MaxTitle)) :-
    max_book(Rest, (LRest, TRest)),
    max_num(L1, LRest, LMax),
    ( LMax = L1 -> MaxLength = L1, MaxTitle = T1
    ; MaxLength = LRest, MaxTitle = TRest
    ).