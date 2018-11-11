/* Populate the tables with our data */
insert into Students values('Pamela@gmail', 'Pamela Pichardo');


/*Building Data*/
insert into Building values('F', 'F104');
insert into Building values('F', 'F102B');
insert into Building values('F', 'F219');
insert into Building values('F', 'F210');
insert into Building values('F', 'F210A');
insert into Building values('F', 'F210B');
insert into Building values('F', 'F209');

insert into Building values('E', 'E249A');
insert into Building values('E', 'E249B');
insert into Building values('E', 'E230');
insert into Building values('E', 'E231');
insert into Building values('E', 'E240');

insert into Building values('C', 'C001');
insert into Building values('C', 'C002');
insert into Building values('C', 'C003');
insert into Building values('C', 'C004');
insert into Building values('C', 'C005');
insert into Building values('C', 'B224');
insert into Building values('C', 'B225');
insert into Building values('C', 'B230');

insert into Building values('G', 'G240');
insert into Building values('G', 'G247');
insert into Building values('G', 'G120');
insert into Building values('G', 'G124');
insert into Building values('G', 'G130');
insert into Building values('G', 'G246');


/*ROOM DATA*/
/*F*/
insert into Room values('F104', 20, 'TV || Computers', 'g');
insert into Room values('F102B', 20, 'TV || Computers', 'efg');
insert into Room values('F219', 25, 'TV || Computers', 'hi');
insert into Room values('F210', 30, 'TV || Computers', 'hi');
insert into Room values('F210A', 30, 'TV || Computers', 'gh');
insert into Room values('F210B', 30, 'TV || Computers', 'gh');
insert into Room values('F209', 20, 'TV || Computers', 'cd');

/*E*/
insert into Room values('E249A', 20, 'TV', 'ef');
insert into Room values('E249B', 20, 'TV', 'hi');
insert into Room values('E230', 15, 'TV', 'i');
insert into Room values('E231', 25, 'TV', 'i');
insert into Room values('E240', 30, 'TV', 'i');

/*C*/

insert into Room values('C001', 5, 'Board', 'abcdefghi');
insert into Room values('C002', 5, 'Board', 'abcdefghi');
insert into Room values('C003', 5, 'Board', 'abcdefghi');
insert into Room values('C004', 5, 'Board', 'abcdefghi');
insert into Room values('C005', 5, 'Board', 'abcdefghi');
insert into Room values('B224', 25, 'TV || Projector', 'abcdefghi');
insert into Room values('B225', 30, 'TV || Projector', 'abcdefghi');
insert into Room values('B230', 35, 'TV || Projector', 'abcdefghi');

/*G*/

insert into Room values('G240', 40, 'TV || Projector', 'ghi');
insert into Room values('G247', 20, 'TV || Computers', 'edf');
insert into Room values('G120', 25, 'TV || Computers', 'cd');
insert into Room values('G124', 25, 'TV || Computers', 'fgh');
insert into Room values('G130', 30, 'TV || Computers', 'hi');
insert into Room values('G246', 25, 'TV || Computers', 'efg');
