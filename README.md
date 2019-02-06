# AButton

## Projet tournant sous Angular 7 & Firebase

## Firecloud
- Cons : compteur du nombre de cons accessible à tout utilisateurs
- dataCons : A chaque fois qu'un con est ajouté ou retiré, un log est enregistré dans cette table
- Remarques : compteur du nombre de remarques accessible à tout utilisateurs
- dataRemarques : A chaque fois qu'une remarque est ajoutée ou retirée, un log est enregistré dans cette table
- Counters : Se base sur les logs de dataCons et dataRemarques. Compte le nombre de remarques / cons par day/month/year
- Users : Contient les infos relatives à l'utilisateur, ainsi que son compteur personnel
- DataRemarquesCons : A chaque fois qu'un utilisateur rajoute +1 à son compteur personnel de con, un log est laissé dans cette table, dans le document correspondant à son displayName google.
- UserCounters : Pour chaque utilisateur, 3 documents : day/month/year, où sont stockées le nombre de remarques de cons. Se base sur la table DataRemarquesCons, en fonction de l'id et de la date.
