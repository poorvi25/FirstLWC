public class MyFirstDemoClass {

    public MyFirstDemoClass(){
        System.debug('My First Demo Class Constructor Called');
    }
    
    public void method1(){
       List<Integer> myList = new List<Integer>();
       List<Integer> myList2 = new List<Integer>();
        myList.add(1);
        myList.add(2);
        myList.add(3);
        
        System.debug('My List ==>'+myList);
        
        //myList.add(1, 10);
        //System.debug('My List ==>'+myList);
        
        //myList2.add(11);
        //myList2.add(12);
        //myList2.add(13);
        
        //myList.addAll(myList2);
        //myList.clear();
        //System.debug('After clearing My List ==>'+myList);
        
        myList2 = myList.clone();
        System.debug('After cloning My List ==>'+myList2);
        
        if(myList.contains(2)){
            System.debug('2 is present');
        }else{
            System.debug('2 is not present');
        }
        
        if(myList.equals(myList2)){
            System.debug('Lists are equal');
        }else{
            System.debug('Lists are not equal');
        }
        
        
    }
    
   
}