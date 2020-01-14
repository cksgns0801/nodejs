// 1. mongoose ��� ��������
var mongoose = require('mongoose');
// 2. testDB ����
mongoose.connect('mongodb://localhost:27017/testDB');
// 3. ����� testDB ���
var db = mongoose.connection;
// 4. ���� ����
db.on('error', function(){
    console.log('Connection Failed!');
});
// 5. ���� ����
db.once('open', function() {
    console.log('Connected!');
});

// 6. Schema ����. (Ȥ�� ��Ű���� ���� ������ ���ٸ�, �Էµ� �������� Ÿ���� ���ǵ� DB ���赵 ��� �����ϸ� �˴ϴ�.)
var student = mongoose.Schema({
    name : 'string',
    address : 'string',
    age : 'number'
});

// 7. ���ǵ� ��Ű���� ��üó�� ����� �� �ֵ��� model() �Լ��� ������
var Student = mongoose.model('Schema', student);

// 8. Student ��ü�� new �� �����ؼ� ���� �Է�
var newStudent = new Student({name:'Hong Gil Dong', address:'����� ������ ������', age:'22'});

// 9. ������ ����
newStudent.save(function(error, data){
    if(error){
        console.log(error);
    }else{
        console.log('Saved!')
    }
});

// 10. Student ���۷��� ��ü ������ ��������
Student.find(function(error, students){
    console.log('--- Read all ---');
    if(error){
        console.log(error);
    }else{
        console.log(students);
    }
})

// 11. Ư�� ���̵� ��������
Student.findOne({_id:'585b777f7e2315063457e4ac'}, function(error,student){
    console.log('--- Read one ---');
    if(error){
        console.log(error);
    }else{
        console.log(student);
    }
});

// 12. Ư�����̵� �����ϱ�
Student.findById({_id:'585b777f7e2315063457e4ac'}, function(error,student){
    console.log('--- Update(PUT) ---');
    if(error){
        console.log(error);
    }else{
        student.name = '--modified--';
        student.save(function(error,modified_student){
            if(error){
                console.log(error);
            }else{
                console.log(modified_student);
            }
        });
    }
});

// 13. ����
Student.remove({_id:'585b7c4371110029b0f584a2'}, function(error,output){
    console.log('--- Delete ---');
    if(error){
        console.log(error);
    }

    /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
        � ������ �ݺ������� ���� �Ͽ��� ����� �����ϴ�. ������ �����͸� �ٽ� �����ϴ���, �������� �ʴ� �����͸� ���ſ�û �ϴ��� ������ �ƴϱ� ������
        �̺κп� ���� ó���� �ʿ����. �׳� ���� �Ȱ����� ó��
        */
    console.log('--- deleted ---');
});