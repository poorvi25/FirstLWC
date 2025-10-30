public class temperature {
    public static Decimal FtoC(decimal fh){
        Decimal res = (fh-32) * 5/9;
        return res.setScale(2);
    }

}